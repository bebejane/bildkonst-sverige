import { Block } from 'next-dato-utils/components';
import * as Components from './'

type BlockProps = { data: any, onClick?: (ids: string) => void }

export default function StructuredBlock({ data, onClick }: BlockProps) {
  return <Block data={data} onClick={onClick} components={Components} />
}