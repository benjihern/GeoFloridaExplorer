#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'     DO NOT REMOVE.
#' @import shiny
#' @noRd
app_server <- function(input, output, session) {
  output$map <- renderLeaflet({
    leaflet() %>%
      addTiles() %>%
      setView(lng = -95.7129, lat = 37.0902, zoom = 4)
  })

  observeEvent(input$goButton, {
    address <- input$location

    location <- geocode("Your City, Your Country")

    leafletProxy("map") %>%
      clearMarkers() %>%
      addMarkers(lng = location$lon, lat = location$lat, popup = address)
  })
}
