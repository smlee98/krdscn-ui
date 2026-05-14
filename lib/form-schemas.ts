// rsc:safe
import { z } from "zod";

export const demoFormSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다.").max(50, "이름은 50자를 초과할 수 없습니다."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  bio: z.string().max(500, "자기소개는 500자 이내입니다.").optional(),
  department: z.enum(["dev", "design", "pm", "etc"], {
    message: "부서를 선택해주세요."
  }),
  agreement: z.boolean().refine((v) => v === true, { message: "이용약관에 동의해야 합니다." }),
  notify: z.enum(["email", "sms", "none"], {
    message: "알림 방법을 선택해주세요."
  }),
  subscribe: z.boolean().default(false),
  joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식이어야 합니다.")
});

export type DemoFormValues = z.infer<typeof demoFormSchema>;
