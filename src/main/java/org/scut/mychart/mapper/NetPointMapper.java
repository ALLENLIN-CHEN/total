package org.scut.mychart.mapper;

import java.util.List;

import org.scut.mychart.model.NetPointModel;

public interface NetPointMapper {
	public List<NetPointModel> selectTerminalAmout();
	
	public List<NetPointModel> selectWorkState();
	
	public List<NetPointModel> selectOperationAmout();
}
