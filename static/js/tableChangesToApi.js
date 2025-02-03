function getValues(){

    var th_region = document.getElementById("th_region")
    const region_input= document.getElementById("region");
    region_input.value = th_region.textContent;
    
    const tags = ["tech_plan", "tech_fact", "tech_dev", "places_plan", "places_fact", "places_dev", "container_places_per_1k", "fgis_utko_places", "containers_plan", "containers_fact", "containers_dev", "containers_per_1k", "fgis_utko_containers"]

    tags.forEach((tag) => {
        var td_tech_plan = document.getElementById("td_"+ tag)
        const input_plan = document.getElementById(tag);
        input_plan.value = td_tech_plan.textContent;
    });
};


