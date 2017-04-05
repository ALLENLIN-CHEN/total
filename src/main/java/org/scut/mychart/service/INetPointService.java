package org.scut.mychart.service;

import java.util.Map;

public interface INetPointService {
	/**
	 * 获取终端数量统计
	 * @return 
	 */
	public Map<String,Object> getTerminalAmount();
	
	/**
	 * 获取网点工作状态统计
	 * @return
	 */
	public Map<String,Object> getWorkState();
	
	/**
	 * 获取网点业务量
	 * @return
	 */
	public Map<String,Object> getOperationAmout();
}
