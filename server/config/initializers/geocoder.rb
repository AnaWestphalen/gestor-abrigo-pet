Geocoder.configure(
  lookup: :mapbox,
  api_key: ENV['MAPBOX_API_KEY'],
  timeout: 5,
  units: :km
)
