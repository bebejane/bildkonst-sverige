
export type Props = {
  data: StartPoliticBlockRecord
}

export default function StartPoliticBlock({ data: { record } }: Props) {
  console.log(record)
  return <div>{record.title}</div>
}