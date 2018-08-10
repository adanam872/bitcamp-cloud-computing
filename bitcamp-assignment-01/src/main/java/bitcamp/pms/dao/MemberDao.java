package bitcamp.pms.dao;

import bitcamp.pms.domain.Member;

public interface MemberDao {

    int delete(String id);

    int insert(Member member);
    
    int selectOne(Member member);
}
