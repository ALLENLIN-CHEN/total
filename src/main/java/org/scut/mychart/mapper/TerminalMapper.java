package org.scut.mychart.mapper;


import org.scut.mychart.model.TerminalModel;

import java.util.List;

public interface TerminalMapper {
	public List<TerminalModel> selectTerminalType();
	public List<TerminalModel> selectTerminalStatus();
	public List<TerminalModel> selectTerminalBusiness();
}	
