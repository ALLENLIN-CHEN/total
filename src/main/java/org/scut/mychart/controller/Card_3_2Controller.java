package org.scut.mychart.controller;

import org.scut.mychart.service.Card_3_2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller  
@RequestMapping(value = "/charts/card_3_2", produces="application/json;charset=UTF-8")
public class Card_3_2Controller {
    @Autowired
    private Card_3_2Service card_3_2Service;

    @RequestMapping("/card_3_2_1")
    @ResponseBody
    public Map<String, Object> getBase_3_2(){
        Map<String, Object> data = this.card_3_2Service.getCard_3_2_1ChartOption();
        return data;
    }

    @RequestMapping("/card_3_2_2")
    @ResponseBody
    public Map<String, Object> getBase_3_3(){
        Map<String, Object> data = this.card_3_2Service.getCard_3_2_2ChartOption();
        return data;
    }

    @RequestMapping("/card_3_3")
    @ResponseBody
    public Map<String, Object> getBase_3_4(){
        Map<String, Object> data = this.card_3_2Service.getCard_3_3ChartOption();
        return data;
    }

    @RequestMapping("/getBigscreen")
    @ResponseBody
    public Map<String, Object> getThemeOption(){
        Map<String, Object> data = this.card_3_2Service.getBigscreen();
        return data;
    }
}   

