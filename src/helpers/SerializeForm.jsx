const SerializeForm = (form) => {
  const formData = new FormData(form)
  const data = {}
  for (let [name, value] of formData) {
    data[name] = value
  }
  return data
}

export default SerializeForm
