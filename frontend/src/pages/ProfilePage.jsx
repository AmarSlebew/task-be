import Card from '../components/common/Card'
import Button from '../components/common/Button'

export default function ProfilePage({ user, onLogout }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-mist/60">Profile</p>
          <h1 className="text-3xl font-semibold text-white">Profil Pengguna</h1>
          <p className="text-sm text-mist/70">Lihat data akun dan keluar dari sesi.</p>
        </div>
        <Button onClick={onLogout} className="px-4 py-2 bg-danger/80 hover:bg-danger">
          Logout
        </Button>
      </div>

      <Card className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-white">Informasi Akun</h2>
        <div className="grid gap-3 text-sm text-mist/80 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-mist/60">Nama</p>
            <p className="text-lg text-white">{user?.name}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-mist/60">Email</p>
            <p className="text-lg text-white">{user?.email}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-mist/60">Tanggal Bergabung</p>
            <p className="text-lg text-white">{user?.joinedAt || '2024-01-01'}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-mist/60">Status</p>
            <p className="text-lg text-success">Aktif</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
