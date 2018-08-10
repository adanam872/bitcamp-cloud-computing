import bitcamp.pms.controller.MemberController;
import bitcamp.pms.domain.Member;

public class TEst {

    public static void main(String[] args) {
        Member member = new Member();
        member.setEmail("user04@test.com");
        member.setName("가가멜");
        member.setPassword("1111");
        
        try {
            System.out.println(new MemberController().add(member));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
    }
}
