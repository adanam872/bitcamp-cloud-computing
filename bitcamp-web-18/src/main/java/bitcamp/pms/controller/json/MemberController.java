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

import bitcamp.pms.domain.Member;
import bitcamp.pms.service.MemberService;

//@CrossOrigin
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired MemberService memberService;
    
    //@CrossOrigin
    @RequestMapping("list")
    public Object list(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "3") int size,
            Model model) throws Exception {

        System.out.println("===============================");
        if (page < 1)
            page = 1;
        if (size < 1 || size > 20)
            size = 3;

        List<Member> list = memberService.list(page, size);
        
        HashMap<String,Object> data = new HashMap<>();
        
        data.put("list", list);
        data.put("page", page);
        data.put("size", size);
        data.put("totalPage", memberService.getTotalPage(size));
        
        return data;
    }
    
    // url 값이 같으면 return 필요 없다.
    @GetMapping(value="form")
    public void form() {
    }

    @PostMapping("add")
    public Object add(Member member) throws Exception {
        
        HashMap<String, Object> result = new HashMap<>();
        memberService.add(member);
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
    
    @RequestMapping("update")
    public Object update(Member member) throws Exception {
        HashMap<String, Object> result = new HashMap<>();

        int count = memberService.update(member);
        if (count == 0) {
            result.put("status", "fail");
            result.put("error", "해당 아이디가 없습니다.");
        } else {
            result.put("status", "success");
        }
        return result;
    }
    
    @RequestMapping("view/{id}")
    public Object view(@PathVariable String id, Model model) throws Exception {

        HashMap<String, Object> data = new HashMap<>();
        data.put("member", memberService.get(id));
        return data;
    }
}
