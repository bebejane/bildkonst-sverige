
type Props = {
  data: StartPoliticBlockRecord
}

export default function StartPoliticBlock({ data: { record } }: Props) {
  return <div>{record.title}</div>
}