const session = await auth()

if (session?.user.role !== "admin") {
  return <p>Acceso denegado</p>
}