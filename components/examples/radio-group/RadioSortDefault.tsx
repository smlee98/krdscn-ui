import { RadioGroup, RadioSort } from "@/registry/krds/ui/radio-group"

export default function RadioSortDefault() {
  return (
    <RadioGroup name="sort" column={false} defaultValue="latest">
      <RadioSort value="latest">최신순</RadioSort>
      <RadioSort value="popular">인기순</RadioSort>
      <RadioSort value="comments">댓글순</RadioSort>
      <RadioSort value="recommends">추천순</RadioSort>
      <RadioSort value="views">조회순</RadioSort>
      <RadioSort value="alpha">가나다순</RadioSort>
    </RadioGroup>
  )
}
