FROM mongo

COPY mongodb_adverse_events.json /mongodb_adverse_events.json

CMD mongoimport --host database --db mean-docker --collection events --drop --file /mongodb_adverse_events.json