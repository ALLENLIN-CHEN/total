package org.scut.mychart.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.scut.mychart.redis.RedisBaseDao;
import org.scut.mychart.service.INetPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/charts/netpoint",produces = "application/json;charset=UTF-8")
public class NetPointController {
	@Autowired	
	private INetPointService netPointService;
	@Autowired
	private RedisBaseDao redisBaseDao;
	private ObjectMapper mapper=new ObjectMapper();
	@RequestMapping("/getTerminalAmount")
	@ResponseBody
	public Map<String,Object> getTerminalAmount(){
		Map<String, Object> result =null;
		String json=null;
		try {
			json=redisBaseDao.getRedisData("/charts/netpoint/getTerminalAmount");
			if(json != null && !json.isEmpty()) {
				return mapper.readValue(json,Map.class);
			}
		}catch (IOException e){
			e.printStackTrace();
		}
		result = netPointService.getTerminalAmount();
		try {
			json = mapper.writeValueAsString(result);
			redisBaseDao.setRedisData("/charts/netpoint/getTerminalAmount", json);
		}catch (IOException e){
			e.printStackTrace();
		}
		return  result;
	}
	
	@RequestMapping("/getWorkState")
	@ResponseBody
	public Map<String, Object> getWorkState() {
		Map<String, Object> result =null;
		String json=null;
		try {
			json=redisBaseDao.getRedisData("/charts/netpoint/getWorkState");
			if(json != null && !json.isEmpty()) {
				return mapper.readValue(json,Map.class);
			}
		}catch (IOException e){
			e.printStackTrace();
		}
		result = netPointService.getWorkState();
		try {
			json = mapper.writeValueAsString(result);
			redisBaseDao.setRedisData("/charts/netpoint/getWorkState", json);
		}catch (IOException e){
			e.printStackTrace();
		}
		return  result;
	}
	
	@RequestMapping("/getOperationAmount")
	@ResponseBody
	public Map<String, Object> getOperationAmount(){
		Map<String, Object> result =null;
		String json=null;
		try {
			json=redisBaseDao.getRedisData("/charts/netpoint/getOperationAmount");
			if(json != null && !json.isEmpty()) {
				return mapper.readValue(json,Map.class);
			}
		}catch (IOException e){
			e.printStackTrace();
		}
		result = netPointService.getOperationAmout();
		try {
			json = mapper.writeValueAsString(result);
			redisBaseDao.setRedisData("/charts/netpoint/getOperationAmount", json);
		}catch (IOException e){
			e.printStackTrace();
		}
		return  result;
	}
}
