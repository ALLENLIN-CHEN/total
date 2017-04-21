package org.scut.mychart.service;

import org.scut.mychart.model.Card_3_2;

import java.util.List;
import java.util.Map;

public interface Card_3_2Service {
    public List<Card_3_2> getCard_3_2(int title);
    public Map<String, Object> getCard_3_2_1ChartOption();
    public Map<String, Object> getCard_3_2_2ChartOption();
    public Map<String, Object> getCard_3_3ChartOption();
    public Map<String, Object> getBigscreen();
}
