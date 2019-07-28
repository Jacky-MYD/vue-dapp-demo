pragma solidity ^0.5.8;
import "./SafeMath.sol";//开源的安全操作unit256的合约

contract Account{
    using SafeMath for uint256;
    //新成员创建事件
    event NewMember(string _name, string _avator);
    //成员信息结构
    struct Member {
        string name;//名字
        string avatar;//头像
        bool isExist;//是否注册
        uint256 balance;//可周转余额
    }
    //地址到成员信息的mapping
    mapping(address => Member) internal addressToMember;
    //限制调用的条件
    modifier onlyMemberOf(address _from){
        require(addressToMember[_from].isExist);
        _;
    }
    // 注册
    function registerMember(string memory _name, string memory _avatar) public {
        require(!isMemberOf());
        addressToMember[msg.sender] = Member(_name, _avatar, true, 0);
        emit NewMember(_name, _avatar);
    }

    // 判断是否注册
    function isMemberOf() public view returns (bool) {
        return addressToMember[msg.sender].isExist;
    }

    // 获取个人信息
    function getMemberInfo() public view onlyMemberOf(msg.sender) returns (string memory name, string memory avatar, uint256 balance) {
        return (addressToMember[msg.sender].name,addressToMember[msg.sender].avatar, addressToMember[msg.sender].balance);
    }
    //获取当前合约中的总余额
    function getTotalBalance() public view returns (uint256) {
        return address(this).balance;
    }
    //取出可周转余额
    function withdraw(uint256 amount) public onlyMemberOf(msg.sender) returns (uint256) {
        require(address(this).balance >= amount);
        addressToMember[msg.sender].balance = addressToMember[msg.sender].balance.sub(amount);
        msg.sender.transfer(amount);
        return addressToMember[msg.sender].balance;
    }
}

