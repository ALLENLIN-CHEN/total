package org.scut.mychart.model;

public class NetPointModel {
	// 统计的年份
	private String year;
	// 网点名称
	private String branchName;
	// 网点地址
	private String branchAddress;
	// 网点终端数量
	private Integer terminalAmount;
	// 正常工作天数
	private Integer work;
	// 异常工作天数
	private Integer notWork;
	// 业务量
	private Integer operationAmount;
	
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getBranchAddress() {
		return branchAddress;
	}
	public void setBranchAddress(String branchAddress) {
		this.branchAddress = branchAddress;
	}
	public Integer getTerminalAmount() {
		return terminalAmount;
	}
	public void setTerminalAmount(Integer terminalAmount) {
		this.terminalAmount = terminalAmount;
	}
	public Integer getWork() {
		return work;
	}
	public void setWork(Integer work) {
		this.work = work;
	}
	public Integer getNotWork() {
		return notWork;
	}
	public void setNotWork(Integer notWork) {
		this.notWork = notWork;
	}
	public Integer getOperationAmount() {
		return operationAmount;
	}
	public void setOperationAmount(Integer operationAmount) {
		this.operationAmount = operationAmount;
	}
}
