import Modal from './Modal'

export default function GuestNoticeModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="guest-notice-title">
      <h2 id="guest-notice-title" className="text-2xl font-extrabold text-ink-900">
        Log in required
      </h2>
      <p className="mt-4 text-ink-500">
        You need to log in to add teachers to your favorites.
      </p>
    </Modal>
  )
}
