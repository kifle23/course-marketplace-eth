// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint id;
        uint price;
        bytes32 proof;
        address owner;
        State state;
    }

    // mapping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of courseID to courseHash
    mapping(uint => bytes32) private ownedCourseHash;

    // number of all courses + id of the course
    uint private totalOwnedCourses;

    address payable private owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    /// Course has already an Owner!
    error CourseHasOwner();

    /// Only owner has an access!
    error OnlyOwner();

    /// Course is not created!
    error CourseIsNotCreated();

    /// Course has invalid state!
    error InvalidState();

    /// Sender is not course owner!
    error SenderIsNotCourseOwner();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

        if (hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }

        uint id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function repurchaseCourse(bytes32 courseHash) external payable {
        if (!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }

        if (!hasCourseOwnership(courseHash)) {
            revert SenderIsNotCourseOwner();
        }

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Deactivated) {
            revert InvalidState();
        }

        course.state = State.Purchased;
        course.price = msg.value;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint index) external view returns (bytes32) {
        return ownedCourseHash[index];
    }

    function activateCourse(bytes32 courseHash) external onlyOwner {
        if (!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }
        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) {
            revert InvalidState();
        }
        course.state = State.Activated;
    }

    function deactivateCourse(bytes32 courseHash) external onlyOwner {
        if (!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }
        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) {
            revert InvalidState();
        }

        (bool success, ) = course.owner.call{value: course.price}("");
        require(success, "Transfer failed.");

        course.state = State.Deactivated;
        course.price = 0;
    }

    function isCourseCreated(bytes32 courseHash) private view returns (bool) {
        return ownedCourses[courseHash].owner != address(0);
    }

    function getCourseByHash(
        bytes32 courseHash
    ) external view returns (Course memory) {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function hasCourseOwnership(
        bytes32 courseHash
    ) private view returns (bool) {
        return ownedCourses[courseHash].owner == msg.sender;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }
}
