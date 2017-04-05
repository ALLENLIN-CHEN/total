package org.scut.mychart.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.scut.mychart.mapper.NetPointMapper;
import org.scut.mychart.model.NetPointModel;
import org.scut.mychart.service.INetPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NetPointServiceImpl implements INetPointService {
	@Autowired
	private NetPointMapper netPointMapper;
	
	@Override
	public Map<String, Object> getTerminalAmount() {
		List<NetPointModel> list = netPointMapper.selectTerminalAmout();		
		Map<String, Object> item = null;					//用于构造某一年某个网点的数据
		List<Map<String, Object>> yearList = null; 			//用于存放某一年所有网点的数据		
		Map<String,Object> dataList = new HashMap<>();		//用于存放所有的数据		
		List<String> years = new ArrayList<String>();		//获取统计的年份
		for(int i=0;i<list.size();i++){
			if(!years.contains(list.get(i).getYear())){
				years.add(list.get(i).getYear());
				yearList = new ArrayList<Map<String,Object>>();
				//j<=i+10获取年份的top10
				for(int j=i;j<list.size() && j<=i+10 && list.get(j).getYear().equals(list.get(i).getYear());j++){
					item = new HashMap<String,Object>();
					item.put("name", list.get(j).getBranchName());
					item.put("address", list.get(j).getBranchAddress());
					item.put("value", list.get(j).getTerminalAmount());					
					yearList.add(item);
				}												
				dataList.put(list.get(i).getYear(), yearList);				
			}
		}								
		dataList.put("years", years);
		return dataList;
	}

	@Override
	public Map<String, Object> getWorkState() {		
		List<NetPointModel> list = netPointMapper.selectWorkState();		
		Map<String, Object> item = null;					//用于构造某一年某个网点的数据
		List<Map<String, Object>> yearList = null; 			//用于存放某一年所有网点的数据		
		Map<String,Object> dataList = new HashMap<>();		//用于存放所有的数据		
		List<String> years = new ArrayList<String>();		//获取统计的年份
		for(int i=0;i<list.size();i++){			
			if(!years.contains(list.get(i).getYear())){
				years.add(list.get(i).getYear());
				yearList = new ArrayList<Map<String,Object>>();
				//j<=i+10获取年份的top10
				for(int j=i;j<list.size() && j<=i+10 && list.get(j).getYear().equals(list.get(i).getYear());j++){
					// 根据正常工作天数获取异常工作天数
					if(checkLeapYear(list.get(j).getYear()))
						list.get(j).setNotWork(366-list.get(j).getWork());
					else
						list.get(j).setNotWork(365-list.get(j).getWork());
					item = new HashMap<String,Object>();
					item.put("name", list.get(j).getBranchName());
					item.put("address", list.get(j).getBranchAddress());
					item.put("work", list.get(j).getWork());
					item.put("notWork", list.get(j).getNotWork());
					yearList.add(item);
				}												
				dataList.put(list.get(i).getYear(), yearList);				
			}
		}								
		dataList.put("years", years);
		return dataList;
	}

	@Override
	public Map<String, Object> getOperationAmout() {
		List<NetPointModel> list = netPointMapper.selectOperationAmout();		
		Map<String, Object> item = null;					//用于构造某一年某个网点的数据
		List<Map<String, Object>> yearList = null; 			//用于存放某一年所有网点的数据		
		Map<String,Object> dataList = new HashMap<>();		//用于存放所有的数据		
		List<String> years = new ArrayList<String>();		//获取统计的年份
		for(int i=0;i<list.size();i++){
			if(!years.contains(list.get(i).getYear())){
				years.add(list.get(i).getYear());
				yearList = new ArrayList<Map<String,Object>>();
				//j<=i+10获取年份的top10
				for(int j=i;j<list.size() && j<=i+10 && list.get(j).getYear().equals(list.get(i).getYear());j++){
					item = new HashMap<String,Object>();
					item.put("name", list.get(j).getBranchName());
					item.put("address", list.get(j).getBranchAddress());
					item.put("value", list.get(j).getOperationAmount());					
					yearList.add(item);
				}							
				dataList.put(list.get(i).getYear(), yearList);				
			}
		}								
		dataList.put("years", years);
		return dataList;
	}
	
	/**
	 * 判断闰年
	 * @param year
	 * @return
	 */
	private boolean checkLeapYear(String year) {
		int y = Integer.valueOf(year);
		if(0 == y%400)
			return true;
		if(0 == y%4 && 0 != y%100)
			return true;
		return false;
	}
}
