package bitcamp.pms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import bitcamp.pms.domain.Card;
import bitcamp.pms.domain.Member;
import bitcamp.pms.service.MemberService;

@Controller
@RequestMapping("/member")
public class MemberController {

    @Autowired MemberService memberService;
    
    @PostMapping("add")
    public String add(Member member) throws Exception {
        memberService.add(member);
        return "redirect:list";
    }
    
    @PostMapping("add2")
    public String add2(Card card) throws Exception {
        memberService.add2(card);
        return "redirect:list";
    }
    
    @RequestMapping("delete")
    public String delete(String id) throws Exception {

        memberService.delete(id);
        return "redirect:list";
    }
    
    @RequestMapping("view")
    public String view(String id, Model model) throws Exception {

        Member member = memberService.get(id);
        System.out.println(member.getName());
        model.addAttribute("member", member);
        return "member/view";
    }
}
