package org.scut.mychart.controller;

import org.codehaus.jackson.map.ObjectMapper;
import org.scut.mychart.redis.RedisBase;
import org.scut.mychart.redis.RedisBaseDao;
import org.scut.mychart.service.IndustryService;
import org.scut.mychart.service.TerminalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Vector;


@Controller
@RequestMapping(value="/charts/terminal", produces="application/json;charset=UTF-8")
public class TerminalController {

	@Autowired
	private TerminalService terminalService;
	@Autowired
	private RedisBaseDao redisBaseDao;
	private ObjectMapper mapper=new ObjectMapper();
	@RequestMapping("/getOption")
    @ResponseBody
    public Map<String, Object> getOption(){
		Map<String, Object> result =null;
		String json=null;
		try {
			json=redisBaseDao.getRedisData("/charts/terminal/getOption");
			if(json != null && !json.isEmpty()) {
				return mapper.readValue(json,Map.class);
			}
		}catch (IOException e){
			e.printStackTrace();
		}
		result = new HashMap<String, Object>();
		result.put("type","terminal");
		result.put("typedata", terminalService.getTerminalType());
		result.put("statusdata", terminalService.getTerminalStatus());
		result.put("businessdata", terminalService.getTerminalBusiness());
		try {
			json = mapper.writeValueAsString(result);
			redisBaseDao.setRedisData("/charts/terminal/getOption", json);
		}catch (IOException e){
			e.printStackTrace();
		}
//		System.out.println(json);
		return  result;
    }

	@RequestMapping("/getTypeOption")
	@ResponseBody
	public Map<String, Object> getTypeOption(){
		Map<String, Object> result =null;
		String json=null;
		try {
			json=redisBaseDao.getRedisData("/charts/terminal/getTypeOption");
			if(json != null && !json.isEmpty()) {
				return mapper.readValue(json,Map.class);
			}
		}catch (IOException e){
			e.printStackTrace();
		}
		result = new HashMap<String, Object>();
		result.put("type","terminaltype");
		result.put("data", terminalService.getTerminalType());
		try {
			json = mapper.writeValueAsString(result);
			redisBaseDao.setRedisData("/charts/terminal/getTypeOption", json);
		}catch (IOException e){
			e.printStackTrace();
		}
		return  result;
	}

	@RequestMapping("/getBusinessOption")
	@ResponseBody
	public Map<String, Object> getBusinessOption(){
		Map<String, Object> result =null;
		String json=null;
		try {
			json=redisBaseDao.getRedisData("/charts/terminal/getBusinessOption");
			if(json != null && !json.isEmpty()) {
				return mapper.readValue(json,Map.class);
			}
		}catch (IOException e){
			e.printStackTrace();
		}
		result = new HashMap<String, Object>();
		result.put("type","terminalbusiness");
		result.put("data", terminalService.getTerminalBusiness());
		try {
			json = mapper.writeValueAsString(result);
			redisBaseDao.setRedisData("/charts/terminal/getBusinessOption", json);
		}catch (IOException e){
			e.printStackTrace();
		}
		return  result;
	}

	@RequestMapping("/getStatusOption")
	@ResponseBody
	public Map<String, Object> getStatusOption(){
		Map<String, Object> result =null;
		String json=null;
		try {
			json=redisBaseDao.getRedisData("/charts/terminal/getStatusOption");
			if(json != null && !json.isEmpty()) {
				return mapper.readValue(json,Map.class);
			}
		}catch (IOException e){
			e.printStackTrace();
		}
		result = new HashMap<String, Object>();
		result.put("type","terminalstatus");
		result.put("data", terminalService.getTerminalStatus());
		try {
			json = mapper.writeValueAsString(result);
			redisBaseDao.setRedisData("/charts/terminal/getStatusOption", json);
		}catch (IOException e){
			e.printStackTrace();
		}
		return  result;
	}
}
