package org.scut.mychart.redis;

import java.util.Map;

public interface RedisBaseDao {
	public String getRedisData(String key);
	
	public void setRedisData(String key, String value);


}
