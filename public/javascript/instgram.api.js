var nextButton = document.getElementById('next-feeds');
var imgs = [];							// store the images for caching
var currentPage = 1;
var loadedPage = 1;         //data cached pages    

var feed = new Instafeed({
    get: 'user',
    debug: true,
    clientId: '467ede5a6b9b48ae8e03f4e2582aeeb3',
    resolution: 'low_resolution',
    accessToken: 'IGQVJYNlBFRUhHNjZAnWk8wU2RERXNBcVFNZAzhGMmk3Ml9RcFY4MmtHakVOUGJVZA3ZAxQmN3MnZAFTVJsR1VWOEpVa3YzWXVtZAVFuSVRTc2pQNl9KemFod1ctS0NNWHRFSGkyMWcxVmpMZAXVCQzdxRG1OegZDZD',
    limit: 9,
    template: `
      <div class="col-md-4 col-sm-6">
        <div class="image-gallery">
          <a href="{{link}}" target="_blank"><img src="{{image}}" class="instagramImg"/></a>
        </div>
      </div>
    `,
    after: function () {
        if (!feed.hasNext()) {
            nextButton.setAttribute('disabled', 'disabled');
        }            
    },
});

// bind the next button
nextButton.addEventListener('click', function (event) {
    event.preventDefault();
    feed.next();
});

feed.run();