package org.scut.mychart.service;

import java.util.Map;

public interface INetPointService {
	/**
	 * ��ȡ�ն�����ͳ��
	 * @return 
	 */
	public Map<String,Object> getTerminalAmount();
	
	/**
	 * ��ȡ���㹤��״̬ͳ��
	 * @return
	 */
	public Map<String,Object> getWorkState();
	
	/**
	 * ��ȡ����ҵ����
	 * @return
	 */
	public Map<String,Object> getOperationAmout();
}
