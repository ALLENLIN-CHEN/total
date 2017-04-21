package org.scut.mychart.service.impl;

import org.scut.mychart.mapper.Card_3_2Mapper;
import org.scut.mychart.model.Card_3_2;
import org.scut.mychart.service.Card_3_2Service;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.*;

@Service("card_3_2Service")
public class Card_3_2ServiceImpl implements Card_3_2Service {

	@Resource
	private Card_3_2Mapper card_3_2Dao;

	private DecimalFormat df   = new DecimalFormat("######0.00");

//	@Autowired
//	private Card_3_2RedisDao card_3_2RedisDao;

	public List<Card_3_2> getCard_3_2(int title){
		HashMap<String,String> param = new HashMap<String,String>();
		switch (title){
			case 1:return this.card_3_2Dao.selectCard_3_2_1(new HashMap());
			case 2:return this.card_3_2Dao.selectCard_3_2_2(new HashMap());
			case 3:return this.card_3_2Dao.selectCard_3_3(new HashMap());
			case 4:return this.card_3_2Dao.selectCard_3_4(new HashMap());
		}
		return null;
	}

	public Map<String, Object> getCard_3_2_1ChartOption(){
		Map<String, Object> data = new HashMap<String, Object>();
		Map<String, Object> result = new HashMap<String, Object>();
		List<Card_3_2> lists = getCard_3_2(1);
		List<String> yearlist = new ArrayList<String>();
		List<String> type = new ArrayList<String>();
		List<Integer> person_num = new ArrayList<Integer>();
		Map<String, Object> year = new HashMap<String, Object>();
		int lastyear=0;
        int sum=0;
		for(Card_3_2 list:lists) {
			if(list.getyear()!=lastyear){
				if(lastyear!=0){
					year.put("type",type);
					yearlist.add(lastyear+"");
					year.put("person_num",person_num);
                    year.put("sum",sum);
					result.put(""+lastyear,year);
				}
				year = new HashMap<String, Object>();
				type = new ArrayList<String>();
				person_num = new ArrayList<Integer>();
				lastyear=list.getyear();
                sum=0;
			}
			type.add(list.getType());
			person_num.add(list.getperson_num());
            sum+=list.getperson_num();
		}
		year.put("type",type);
		year.put("person_num",person_num);
        year.put("sum",sum);
		yearlist.add(lastyear+"");
		result.put(""+lastyear,year);
		data.put("model",result);
		data.put("yearlist",yearlist);
		data.put("type", "card_3_2_1");
		return data;
	}

	public Map<String, Object> getCard_3_2_2ChartOption(){
		Map<String, Object> data = new HashMap<String, Object>();
		Map<String, Object> result = new HashMap<String, Object>();
		List<Card_3_2> lists = getCard_3_2(2);
		List<String> type = new ArrayList<String>();
		List<Integer> person_num = new ArrayList<Integer>();
		List<Double> rate = new ArrayList<Double>();
		Map<String, Object> year = new HashMap<String, Object>();
		int lastyear=0;
		int years=0;
		double sum=0;
		for(Card_3_2 list:lists) {
			if(lastyear!=list.getyear()) {
				years++;
				lastyear=list.getyear();
			}
			sum+=list.getperson_num();
		}
		sum/=years;
		lastyear=0;
		for(Card_3_2 list:lists) {
			if(list.getyear()!=lastyear){
				if(lastyear!=0){
					year.put("type",type);
					year.put("person_num",person_num);
					year.put("ratelist",rate);
					result.put(""+lastyear,year);
				}
				year = new HashMap<String, Object>();
				type = new ArrayList<String>();
				person_num = new ArrayList<Integer>();
				rate = new ArrayList<Double>();
				lastyear=list.getyear();
			}
			type.add(list.getType());
			person_num.add(list.getperson_num());
			rate.add(Double.parseDouble(df.format(100*list.getperson_num()/sum)));
		}
		year.put("type",type);
        year.put("ratelist",rate);
		year.put("person_num",person_num);
		result.put(""+lastyear,year);
		data.put("model",result);
		data.put("type", "card_3_2_2");
		return data;
	}

	public Map<String, Object> getCard_3_3ChartOption(){
		Map<String, Object> data = new HashMap<String, Object>();
		Map<String, Object> result = new HashMap<String, Object>();
		List<Card_3_2> lists = getCard_3_2(3);
		List<String> age = new ArrayList<String>();
		List<Integer> person_num = new ArrayList<Integer>();
		Map<String, Object> year = new HashMap<String, Object>();
		int lastyear=0;
		for(Card_3_2 list:lists) {
			if(list.getyear()!=lastyear){
				if(lastyear!=0){
					year.put("age",age);
					year.put("person_num",person_num);
					result.put(""+lastyear,year);
				}
				year = new HashMap<String, Object>();
				age = new ArrayList<String>();
				person_num = new ArrayList<Integer>();
				lastyear=list.getyear();
			}
			age.add(list.getage());
			person_num.add(list.getperson_num());
		}
		year.put("age",age);
		year.put("person_num",person_num);
		result.put(""+lastyear,year);
		data.put("model",result);
		data.put("type", "card_3_3");
		return data;
	}

	public Map<String, Object> getBigscreen(){
		Map<String, Object> card_3_2_1=getCard_3_2_1ChartOption();
		Map<String, Object> card_3_2_2=getCard_3_2_2ChartOption();
		Map<String, Object> card_3_3=getCard_3_3ChartOption();
		List<Double> maleRate = new ArrayList<Double>();
		List<Double> femaleRate = new ArrayList<Double>();
		List<Double> totalRate = new ArrayList<Double>();
		List<Integer> male = new ArrayList<Integer>();
		List<Integer> female = new ArrayList<Integer>();
		List<Integer> total = new ArrayList<Integer>();
		List yearlist = (ArrayList<String>)card_3_2_1.get("yearlist");
		Collections.sort(yearlist);
		List<Card_3_2> lists = getCard_3_2(4);
		HashMap<String, Object> yearMap = new HashMap<>();
		for(int i=0;i<yearlist.size();i++){
			String year=yearlist.get(i).toString();

			for(Card_3_2 list:lists) {
				if(year.equals(list.getyear()+"")){
					if(list.getSex().equals("男")){
						male.add(list.getperson_num());
					}else{
						female.add(list.getperson_num());
					}
				}
			}
			total.add(male.get(i)+female.get(i));
			maleRate.add(Double.parseDouble(df.format((double)100*male.get(i)/total.get(i))));
			femaleRate.add(Double.parseDouble(df.format((double)100*female.get(i)/total.get(i))));
			totalRate.add(Double.parseDouble(df.format((double)100*male.get(i)/female.get(i))));
			HashMap<String, Object> yearItem = new HashMap<>();

			yearItem.put("cardTypeName",((Map<String, Object>)((Map<String, Object>)card_3_2_1.get("model")).get(year)).get("type"));
			yearItem.put("cardTypeData",((Map<String, Object>)((Map<String, Object>)card_3_2_1.get("model")).get(year)).get("person_num"));
			yearItem.put("detailTypeName",((Map<String, Object>)((Map<String, Object>)card_3_2_2.get("model")).get(year)).get("type"));
			yearItem.put("detailTypeData",((Map<String, Object>)((Map<String, Object>)card_3_2_2.get("model")).get(year)).get("person_num"));
			yearItem.put("detailTypeRate",((Map<String, Object>)((Map<String, Object>)card_3_2_2.get("model")).get(year)).get("ratelist"));
			yearItem.put("ageTypeName",((Map<String, Object>)((Map<String, Object>)card_3_3.get("model")).get(year)).get("age"));
			yearItem.put("ageTypeData",((Map<String, Object>)((Map<String, Object>)card_3_3.get("model")).get(year)).get("person_num"));

			List<Integer> cardTypeRate = new ArrayList<Integer>();
			List<Integer> temp =(ArrayList<Integer>)yearItem.get("cardTypeData");
			for(int t=0;t<temp.size();t++){
				cardTypeRate.add(100*temp.get(t)/total.get(i));
			}
			yearItem.put("cardTypeRate",cardTypeRate);
			yearMap.put(year,yearItem);
		}

		Map<String, Object> resultdata=new HashMap<>();
		resultdata.put("male",male);
		resultdata.put("female",female);
		resultdata.put("maleRate",maleRate);
		resultdata.put("femaleRate",femaleRate);
		resultdata.put("totalRate",totalRate);
		resultdata.put("total",total);
		resultdata.put("yearList",yearlist);
		resultdata.put("yearMap",yearMap);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("type","ThemeOption");
		result.put("data",resultdata);
		return result;
	}
}