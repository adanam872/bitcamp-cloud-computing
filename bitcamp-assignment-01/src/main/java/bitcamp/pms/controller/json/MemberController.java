package bitcamp.pms.controller.json;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.pms.domain.Card;
import bitcamp.pms.domain.Member;
import bitcamp.pms.service.MemberService;

//@CrossOrigin
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired MemberService memberService;
    
    @PostMapping("add")
    public Object add(Member member) throws Exception {
        
        HashMap<String, Object> result = new HashMap<>();
        memberService.add(member);
        result.put("status", "success");
        return result;
    }
    
    @PostMapping("add2")
    public Object add2(Card card) throws Exception {
        
        HashMap<String, Object> result = new HashMap<>();
        memberService.add2(card);
        result.put("status", "success");
        return result;
    }
    
    @RequestMapping("delete")
    public Object delete(String id) throws Exception {
        HashMap<String, Object> result = new HashMap<>();

        int count = memberService.delete(id);
        if (count == 0) {
            result.put("status", "fail");
            result.put("error", "해당 아이디가 없습니다.");
        } else {
            result.put("status", "success");
        }
        return result;
    }
    
    @RequestMapping("view")
    public Object view(Member member, Model model) throws Exception {

        HashMap<String, Object> data = new HashMap<>();
        data.put("seq", memberService.get(member));
        data.put("status", "success");
        return data;
    }
}
