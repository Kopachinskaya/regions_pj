function getValues(){

    var th_region = document.getElementById("th_region")
    const region_input= document.getElementById("region");
    region_input.value = th_region.textContent;

    var td_tech_plan = document.getElementById("td_tech_plan")
    const input_plan = document.getElementById("tech_plan");
    input_plan.value = td_tech_plan.textContent;

    var td_tech_fact = document.getElementById("td_tech_fact")
    const input_fact = document.getElementById("tech_fact");
    input_fact.value = td_tech_fact.textContent;

    var td_tech_dev = document.getElementById( "td_tech_dev" )
    const input_dev = document.getElementById("tech_dev");
    input_dev.value = td_tech_dev.textContent;

    var td_places_plan = document.getElementById( "td_places_plan" )
    const input_places_plan = document.getElementById("places_plan");
    input_places_plan.value = td_places_plan.textContent;

    var td_places_fact = document.getElementById( "td_places_fact" )
    const input_places_fact = document.getElementById("places_fact");
    input_places_fact.value = td_places_fact.textContent;

    var td_places_dev = document.getElementById( "td_places_dev" )
    const input_places_dev = document.getElementById("places_dev");
    input_places_dev.value = td_places_dev.textContent;

    var td_container_places_per_1k = document.getElementById( "td_container_places_per_1k" )
    const input_places_1k = document.getElementById("container_places_per_1k");
    input_places_1k.value = td_container_places_per_1k.textContent;

    var td_fgis_utko_places = document.getElementById("td_fgis_utko_places" )
    const input_places_fgis = document.getElementById("fgis_utko_places");
    input_places_fgis.value = td_fgis_utko_places.textContent;

    var td_containers_plan = document.getElementById( "td_containers_plan" )
    const input_containers_plan = document.getElementById("containers_plan");
    input_containers_plan.value = td_containers_plan.textContent;

    var td_containers_fact = document.getElementById( "td_containers_fact" )
    const input_containers_fact = document.getElementById("containers_fact");
    input_containers_fact.value = td_containers_fact.textContent;

    var td_containers_dev = document.getElementById( "td_containers_dev" )
    const input_containers_dev = document.getElementById("containers_dev");
    input_containers_dev.value = td_containers_dev.textContent;

    var td_containers_per_1k = document.getElementById( "td_containers_per_1k" )
    const input_containers_1k = document.getElementById("containers_per_1k");
    input_containers_1k.value = td_containers_per_1k.textContent;

    var td_fgis_utko_containers = document.getElementById( "td_fgis_utko_containers" )
    const input_containers_fgis = document.getElementById("fgis_utko_containers");
    input_containers_fgis.value = td_fgis_utko_containers.textContent;

}

