GEAR=$CONFIG/gear/*
for gear in $GEAR
do
    filename=`echo $gear | cut -c ${#GEAR}-`
    npx wrangler r2 object put strava/gear/$filename --file $gear --local
done
POSTS=$LOCAL/src/content/posts/*
for post in $POSTS
do
    filename=`echo $post | cut -c ${#POSTS}-`
    npx wrangler r2 object put blog/posts/$filename --file $post --local
done
IMAGES=$LOCAL/public/img/*
for image in $IMAGES
do
    filename=`echo $image | cut -c ${#IMAGES}-`
    npx wrangler r2 object put blog/img/$filename --file $image
done