#' The application User-Interface
#'
#' @param request Internal parameter for `{shiny}`.
#'     DO NOT REMOVE.
#' @import shiny
#' @noRd
#'
#'
library(shiny)
library(leaflet)

app_ui <- function(request) {
  tagList(

    golem_add_external_resources(),

    fluidPage(
      titlePanel("Florida Ecological Services Web App"),
      sidebarLayout(
        sidebarPanel(
          textInput("location", "Enter location:", ""),
          actionButton("goButton", "Go!")
        ),
        mainPanel(
          leafletOutput("map")
        )
      )
    )
  )
}

#' Add external Resources to the Application
#'
#' This function is internally used to add external
#' resources inside the Shiny application.
#'
#' @import shiny
#' @importFrom golem add_resource_path activate_js favicon bundle_resources
#' @noRd
golem_add_external_resources <- function() {
  add_resource_path(
    "www",
    app_sys("app/www")
  )

  tags$head(
    favicon(),
    bundle_resources(
      path = app_sys("app/www"),
      app_title = "golex"
    )
    # Add here other external resources
    # for example, you can add shinyalert::useShinyalert()
  )
}
