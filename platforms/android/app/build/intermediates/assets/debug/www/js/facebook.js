

var login = function () {
                if (!window.cordova) {
                    var appId = prompt("263432487855391", "");
                    facebookConnectPlugin.browserInit(appId);
                }
                facebookConnectPlugin.login( ["email"],
                    function (response) { 
                        //alert(JSON.stringify(response));
                        apiPicture();
                    },
                    function (response) { alert(JSON.stringify(response)) });
            }
            
            var showDialog = function () { 
                facebookConnectPlugin.showDialog( { method: "feed" }, 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            
            var apiTest = function () { 
                facebookConnectPlugin.api( "me/?fields=id,email", ["user_birthday"],
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) }); 
            }
            var apiPicture = function () { 
                /*facebookConnectPlugin.api( "me/picture?width=140&height=140", ["public_profile"],
                    function (response) { alert(response) },
                    function (response) { alert(JSON.stringify(response.data.url)) }); 
                    */
                facebookConnectPlugin.api(
                    "me/?fields=first_name,last_name,picture",
                    ["public_profile"],
                    function (response) {
                        var imageBadQuality = response.picture.data.url;
                        var name= response.first_name + ' ' + response.last_name;
                        $("p#fbName").text(name);
                        $("img#fbPicture").attr('src', imageBadQuality);
                        $("div#fbButton").hide();
                        $("table#fbProfile").show();
                        getFBFriendsData();
                        //alert(imageBadQuality + ", name: " + name);
                    }
                );
            }
            var logPurchase = function () {
                facebookConnectPlugin.logPurchase(1.99, "USD",
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            var logEvent = function () {
                // For more information on AppEvent param structure see
                // https://developers.facebook.com/docs/ios/app-events
                // https://developers.facebook.com/docs/android/app-events
                facebookConnectPlugin.logEvent("Purchased",
                    {
                        NumItems: 1,
                        Currency: "USD",
                        ContentType: "shoes",
                        ContentID: "HDFU-8452"
                    }, null,
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            var getAccessToken = function () { 
                facebookConnectPlugin.getAccessToken( 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            
            var getStatus = function () { 
                facebookConnectPlugin.getLoginStatus( 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            var logout = function () { 
                facebookConnectPlugin.logout( 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
            }
            var getFBFriendsData = function() {
                facebookConnectPlugin.api( "/me/friends?fields=first_name,last_name,picture", ["user_friends"],
                    function (response) {
                        //alert("fb friends data =>"+JSON.stringify(response));
                        var fb = response.data;
                        if(fb.length >0) {
                            fb.forEach(function(key, value){
                                //fbFriendsData.push(key.id);
                                $('table#fbProfile').append(
                                    $('<tr>').append(
                                        $('<td>').append($('<img>').attr('src', key.picture.data.url).attr('style',"border-radius: 50%"))
                                    ).append(
                                        $('<td>').text(key.first_name + ' ' + key.last_name)
                                    )
                                );
                            });
                        }
                    },
                    function (response) {
                        alert("FB Friends Error response:" + JSON.stringify(response));
                    }
                );
            }
