package bitcamp.pms.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bitcamp.pms.dao.MemberDao;
import bitcamp.pms.domain.Member;

@Service
public class MemberService {

    @Autowired MemberDao memberDao;

    public List<Member> list(int page, int size) {
        
        // DB에서 가져올 데이터의 페이지 정보
        HashMap<String, Object> params = new HashMap<>();
        params.put("startIndex", (page - 1) * size);
        params.put("pageSize", size);

        return memberDao.selectList(params);
    }

    public Member get(String id) {
        return memberDao.selectOne(id);
    }

    // @Transactional(readOnly=true) 를 붙이면 이 메서드 안에서는 데이터 변경 작업이 불가능하다.
    // @Transactional 묶으면 매서드가 끝날 때 까지 정상적 실행이 끝날 때 까지는 적용되지 않는다. 예외생기면 Rollback 된다.
    // Annotation 대신 XML 태그에 설정할 수 있다
    public int update(Member member) {
        int count = memberDao.update(member);
        
//        if (count != 100)
//            throw new RuntimeException("일부로 예외 발생!");
        
        return count;
    }

    public int delete(String id) {
        return memberDao.delete(id);
    }

    public void add(Member member) {
        memberDao.insert(member);
    }
    
    public int getTotalPage(int size) {
        return memberDao.countAll() / size + 1;
    }
}
