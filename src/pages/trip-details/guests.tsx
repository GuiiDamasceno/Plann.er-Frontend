import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { InviteGuestsModal } from '../create-trip/invite-guests-modal'

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [openManageGuestsModal, setOpenManageGuestsModal] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([''])

  function OpenGuestsModal() {
    setOpenManageGuestsModal(true)
  }

  async function closeGuestsModal() {
    setOpenManageGuestsModal(false)
    await api.post(`/trips/${tripId}/invites`, {
      email: `${emailsToInvite}`,
    })
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string) {
    setEmailsToInvite(emailsToInvite.filter((email) => email !== emailToRemove))
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 text-green-400 shrink-0" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400 shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      <Button onClick={OpenGuestsModal} size="full" variant="secondary">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {openManageGuestsModal && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}
    </div>
  )
}
