// === CONSTANTS ===

// canvas
const cvs = document.getElementById("main_canvas");
const ctx = cvs.getContext("2d");

// sliders and indicator
const nodes_sld = document.getElementById("nof_nodes_slider");
const nodes_ind = document.getElementById("nof_nodes_indicator");
const multip_sld = document.getElementById("multiplier_slider");
const multip_ind = document.getElementById("multiplier_indicator");
const nrad_sld = document.getElementById("node_radius_slider");
const nrad_ind = document.getElementById("node_radius_indicator");

const red_sld = document.getElementById("red_slider");
const green_sld = document.getElementById("green_slider");
const blue_sld = document.getElementById("blue_slider");
const color_ind = document.getElementById("color_indicator");


// values
const unit = 800;
const radius = unit * 0.45;

const interval = 50;

const PI = Math.PI;

// numerical variables
var nof_nodes = 100;
var multiplier = 2;

var node_radius = 2;

let node_loc;

// colors
var node_circle_color = "rgb(255,0,0)";
var line_color = "rgb(0,255,0)";


// ===== draws node indicators =====
function create_nodes(){

    node_loc = []

    ctx.fillStyle = node_circle_color;

    for(i = 0; i < nof_nodes; i++){

        degree = 2*PI / nof_nodes * i;

        x = get_cartesian_x(radius, degree);
        y = get_cartesian_y(radius, degree);

        ctx.beginPath();
        ctx.arc(unit/2+x,unit/2+y,node_radius,0,2*PI);
        ctx.fill();

        node_loc.push([x,y]);
    }

}

// adjust values (from sliders)
function adjust_values(){

    nof_nodes = nodes_sld.value;
    nodes_ind.innerHTML = nof_nodes;

    multiplier = multip_sld.value;
    multip_ind.innerHTML = multiplier;

    node_radius = nrad_sld.value;
    nrad_ind.innerHTML = node_radius;

    line_color = "rgb("+red_sld.value+","+green_sld.value+","+blue_sld.value+")";
    color_ind.innerHTML = red_sld.value+", "+green_sld.value+", "+blue_sld.value;
}

// calculate cartesian coordinates (from polar)
function get_cartesian_x(radius, degree){
    return radius * Math.cos(degree);
}

function get_cartesian_y(radius, degree){
    return radius * Math.sin(degree);
}

// ===== draw div - connections =====
function darw_connections(){

    ctx.strokeStyle = line_color;

    for(i = 0; i < nof_nodes; i++){

        j = Math.round(i*multiplier) % nof_nodes;

        ctx.beginPath();
        ctx.moveTo(unit/2 + node_loc[i][0], unit/2 + node_loc[i][1]);
        ctx.lineTo(unit/2 + node_loc[j][0], unit/2 + node_loc[j][1]);
        ctx.stroke();

    }
}

// ===== ongong loop =====
function present_all(){
    update_view()
    adjust_values();
}

function update_view(){
    ctx.clearRect(0,0,unit,unit)
    create_nodes();
    darw_connections();
}


// init
update_view();
game_interval = setInterval(present_all,interval);


