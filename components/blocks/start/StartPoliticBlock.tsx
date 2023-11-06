
type Props = {
  data: PoliticRecord
}

export default function StartPoliticBlock({ data: politic }: Props) {
  return <div>{politic.title}</div>
}