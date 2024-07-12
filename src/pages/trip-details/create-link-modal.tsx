import { Link2, Tag, X } from 'lucide-react'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { FormEvent } from 'react'
import { api } from '../../lib/axios'

interface CreateLinkModalProps {
  closeLinkModal: () => void
}

export function CreateLinkModal({ closeLinkModal }: CreateLinkModalProps) {
  const { tripId } = useParams()

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    })

    closeLinkModal()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={closeLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="flex items-center gap-2 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg">
            <Tag className="text-zinc-400 size-5" />
            <Input type="text" name="title" placeholder="Título do link" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center flex-1 gap-2 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Link2 className="text-zinc-400 size-5" />
              <Input type="url" name="url" placeholder="URL" />
            </div>
          </div>

          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  )
}
