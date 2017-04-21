package org.scut.mychart.service.impl;


import org.scut.mychart.mapper.TerminalMapper;
import org.scut.mychart.model.TerminalModel;
import org.scut.mychart.service.TerminalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("terminalService")
public class TerminalServiceImpl implements TerminalService {

    @Autowired
    private TerminalMapper terminalMapper;

    public HashMap<String, List<TerminalModel>> getMapResult(List<TerminalModel> total) {
        HashMap<String, List<TerminalModel>> result = new HashMap<String, List<TerminalModel>>();

        for (int i = 0; i < total.size(); i++) {
            TerminalModel i3 = total.get(i);
            List<TerminalModel> yearList=result.get(i3.getYear().toString());
            if (yearList == null) {
                yearList=new ArrayList<TerminalModel>();
            }
            yearList.add(i3);
            result.put(i3.getYear().toString(), yearList);
        }
        return result;
    }
    public double getSum(List<TerminalModel> total){
        double sum=0;
        for(TerminalModel i:total){
            sum+=i.getValue();
        }
        return  sum;
    }

    public Map<String, Object> getTerminalType() {
        List<TerminalModel> totalList = terminalMapper.selectTerminalType();
        Map<String, Object> resultdata=new HashMap<>();
        HashMap<String, List<TerminalModel>> result = this.getMapResult(totalList);
        List yearlist = Arrays.asList(result.keySet().toArray());
        Collections.sort(yearlist);
        resultdata.put("yearlist",yearlist);
        resultdata.put("datamap",result);
        return resultdata;
    }
    public Map<String, Object> getTerminalBusiness() {
        List<TerminalModel> totalList =  terminalMapper.selectTerminalBusiness();
        Map<String, Object> resultdata=new HashMap<>();
        HashMap<String, List<TerminalModel>> result = this.getMapResult(totalList);
        List yearlist = Arrays.asList(result.keySet().toArray());
        Collections.sort(yearlist);
        resultdata.put("yearlist",yearlist);
        resultdata.put("datamap",result);
        return resultdata;
    }
    public Map<String, Object> getTerminalStatus() {
        List<TerminalModel> totalList = terminalMapper.selectTerminalStatus();
        Map<String, Object> resultdata=new HashMap<>();
        HashMap<String, List<TerminalModel>> result = this.getMapResult(totalList);
        List yearlist = Arrays.asList(result.keySet().toArray());
        Collections.sort(yearlist);
        resultdata.put("yearlist",yearlist);
        resultdata.put("datamap",result);
        return resultdata;
    }

}
