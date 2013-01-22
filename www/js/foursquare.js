var runFoursquare = function(){ 
    foursquareIcon.clearLayers();
    
    //Overrides css to make sure main marker does not receive 4sq marker styling
    $("img[src*='marker-icon.png']").css('opacity','1');
    $("img[src*='dot.png']").css('opacity','1');

    
    //remove loading gif
    setTimeout(function(){
        $("#sent img").fadeOut("slow", function () {
        $("#sent img").remove();
            });
    }, 400);
    
    //Dont run foursquare if off
    if($("#turn-off-4sq").hasClass("on")){

    return false

        } else {

        var authToken, authorizeApp, circle, fourSquareClientId, fourSquareSecret, fourSquareToken, getToken, mappingTasks, redirectUrl, request, searchRadius, token,tokenCheck,makrer,myIcon;
        circle = '';
        token = '';
        authToken = 0;
        place = '';
        address = '';
        fourSquareToken = '';
        fourSquareClientId = '3ODULPRCZOZL43JVOBNUBAUPXD5MXKBX24DOUZYNO0V3SEUL';
        fourSquareSecret = 'MBM0IB0YS1JZB2QLZ3WZDHSZAC10JOO0JY4VGDOF0IU3E5AH';
        searchRadius = 120;
        venue ='';

            var uri;
            $.ajax({
              type: "GET",
              dataType: "jsonp",
              cache: false,
              url: 'https://api.foursquare.com/v2/venues/explore?ll=' + lat + ',' + lng + '&limit=5&radius=' + searchRadius + '&client_id=' + fourSquareClientId + '&client_secret=' + fourSquareSecret + '&v=20120726',
              success: function(venues) {
                var groups;
                
      

                groupsUn = venues.response.groups[0].items;
                console.log(groupsUn)
                groups = groupsUn.sort();



                return _.each(groups, function(item) {
                  var locationLat, locationLng, object, photoTemplate;
                  locationLat = item.venue.location.lat;
                  locationLng = item.venue.location.lng;

                  address = (item.venue.location.address).replace(/\s+/g, '-');
                  console.log(address)

                venue = item.venue.name
                venueDash = venue.replace(/\s+/g, '-').replace(/\./g, "").replace(/'/g, '').replace(/@/g, '').replace(/&/g,"");
                size = $("#foursquare li").size()

                iconPath = item.venue.categories[0].icon.prefix
                png = item.venue.categories[0].icon.suffix
                icon = iconPath+ "256" + png

                distance = item.venue.location.distance;


                 MyIconType = L.Icon.extend({
                            options: {
                                iconUrl: icon,
                                shadowUrl: null,
                                iconSize: new L.Point(22, 22),
                                shadowSize: null,
                                iconAnchor: new L.Point(10, 10),
                                className: venueDash,
                            }
                        });

                    //Add icons to map
                    myIcon = new MyIconType();
                    marker = new L.Marker(new L.LatLng(locationLat, locationLng), {
                        icon: myIcon,
                    })

                    foursquareIcon.addLayer(marker);
                    
                //Leave text if there are no 4sq locarions
                if ($('#foursquare li').length ==0) {
                    $("#sent").html("");
                        }else{
                    }

                //$("#sent").html("<p style='text-align: center;'>Add a specific location:</p>");
                $("#sent").append("<div id='foursquare' onclick='initFastButtons()' id='fastclick'></div>"); // Adds venues to the list
                
                $("#foursquare").append("<li distance="+distance+" class="+venue+" id="+address+">"+venue+"</li>").hide().each(function(i) {
                    $(this).delay(100*i).animate({
                        "height": "show",
                        "marginTop": "show",
                        "marginBottom": "show",
                        "paddingTop": "show",
                        "paddingBottom": "show"}, 700);
                    }); // Adds venues to the list

                //Sort List on distance
                var items = $('#foursquare li').get();
                items.sort(function(a, b) {
                    var relA = +$(a).attr('distance');
                    var relB = +$(b).attr('distance');
                 
                     if (relA > relB) { return 1; }
                     if (relA < relB) { return -1; }
                     return 0;
                });
                for (var i=0; i< items.length; i++) {
                    $('#foursquare').append(items[i]);
                }


             
                $("#foursquare li").click(function() {
                    place = $(this).text()
                    address2 = ($(this).attr('id')).replace(/-/g, ' ')
                    placeAddress = place+", "+address2+"."
                    console.log(placeAddress)
                    return false
                });

                $("#foursquare li").click(function() {
                    placeDash = place.replace(/\s+/g, '-').replace(/\./g,'').replace(/@/g, '').replace(/'/g, '').replace(/&/g,'');
                    console.log(placeDash)
                    $(".leaflet-marker-pane").find("."+placeDash).addClass("icon-selected").siblings().removeClass("icon-selected");;
                    return false
                });


                $("#foursquare li").click(function() {
                    $(this).addClass("clicked").siblings().removeClass("clicked");
                    $("#footer").slideDown("fast");
                });

                $("#foursquare li").click(function() {
                    $("#settingsFooter").slideUp("fast");
                    $("#footer").slideDown("fast");
                });
                   
                $('img').error(function(){ 
                    $(this).attr('src', 'img/4sq_none.png');
                });

                });
            }
        });
    }
}
