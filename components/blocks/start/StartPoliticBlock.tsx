import Link from "next/link"

type Props = {
  data: StartPoliticBlockRecord
}

export default function StartPoliticBlock({ data: { record: politic } }: Props) {
  return (
    <div>
      <Link href={`/${politic.category.slug}/${politic.slug}`}>{politic.title}</Link>
    </div>
  )
}