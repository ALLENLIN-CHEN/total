package org.scut.mychart.controller;

import org.scut.mychart.service.IndustryService;
import org.scut.mychart.service.TerminalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Vector;


@Controller
@RequestMapping(value="/charts/terminal", produces="application/json;charset=UTF-8")
public class TerminalController {

	@Autowired
	private TerminalService terminalService;

	@RequestMapping("/getOption")
    @ResponseBody
    public Map<String, Object> getOption(){
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("type","terminal");
		result.put("typedata", terminalService.getTerminalType());
		result.put("statusdata", terminalService.getTerminalStatus());
		result.put("businessdata", terminalService.getTerminalBusiness());
		return  result;
    }

	@RequestMapping("/getTypeOption")
	@ResponseBody
	public Map<String, Object> getTypeOption(){
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("type","terminaltype");
		result.put("data", terminalService.getTerminalType());
		return  result;
	}

	@RequestMapping("/getBusinessOption")
	@ResponseBody
	public Map<String, Object> getBusinessOption(){
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("type","terminalbusiness");
		result.put("data", terminalService.getTerminalBusiness());
		return  result;
	}

	@RequestMapping("/getStatusOption")
	@ResponseBody
	public Map<String, Object> getStatusOption(){
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("type","terminalstatus");
		result.put("data", terminalService.getTerminalStatus());
		return  result;
	}
}
