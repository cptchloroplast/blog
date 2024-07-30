GEAR=$CONFIG/gear/*
for gear in $GEAR
do
    filename=`echo $gear | cut -c ${#GEAR}-`
    npx wrangler r2 object put strava/gear/$filename --file $gear --local
done