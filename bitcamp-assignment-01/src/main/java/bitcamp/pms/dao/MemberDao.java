package bitcamp.pms.dao;

import bitcamp.pms.domain.Card;
import bitcamp.pms.domain.Member;

public interface MemberDao {

    int delete(String id);

    int insert(Member member);
    
    int add(Card card);
    
    int selectOne(Member member);
}
