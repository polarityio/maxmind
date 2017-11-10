# Polarity MaxMind Integration

The Polarity [Maxmind](https://www.maxmind.com/) integration allows Polarity to retrieve geolocation information for IPv4 and IPv6 addresses using the MaxMind GeoIP2 or GeoLite2 databases.  

You can download the free MaxMind GeoLite2 City and ASN databases directly from MaxMind at [https://dev.maxmind.com/geoip/geoip2/geolite2/](https://dev.maxmind.com/geoip/geoip2/geolite2/)

We recommend downloading the latest `GeoLite2 City` database (in binary format) and `GeoLite2 ASN` database (also in binary format).  Both of these database should be uploaded to your Polarity Server.  See Installation Instructions for more information.

| ![image](https://user-images.githubusercontent.com/306319/32642802-bb273cc4-c5a4-11e7-8d96-207cb95c6515.png) |
|---|
|*MaxMind lookup example* |

 
## Installation Instructions

### Cloning the Integration

When cloning this integration please ensure you save the integration into a directory that is not named `maxmind`.  This is due to a conflict with Polarity's legacy client-side maxmind integration.  As an example, if using git to clone the repo onto your Polarity Server you would use the following command to clone the repo into a directory called `maxmind.server`.

```
git clone https://github.com/polarityio/maxmind.git maxmind.server
```

### Updating the MaxMind Databases

This integration includes the free MaxMind City and ASN database.  New databases are released on the first tuesday of each month and we recommend keeping your database updated with teh latest version.  To do thi you can download both the MaxMind GeoLite2 City and MaxMind GeoLite2 ASN databases from the following links:

City Database: http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.tar.gz
ASN Database: http://geolite.maxmind.com/download/geoip/database/GeoLite2-ASN.tar.gz

After downloading and untaring the files you should have two database files:

```
GeoLite2-City.mmdb
GeoLite2-ASN.mmdb
```

Upload these database files to your polarity server's MaxMind integration directory.  For example, if you saved the maxmind integration into a directory called `maxmind.server` then you would place the two maxmind database files into the directory:
 
```
/app/polarity-server/integrations/maxmind.server/database
```

Additional installation instructions for integrations are provided on the [PolarityIO GitHub Page](https://polarityio.github.io/).

## Polarity

Polarity is a memory-augmentation platform that improves and accelerates analyst decision making.  For more information about the Polarity platform please see:

https://polarity.io/

> This product includes GeoLite2 data created by MaxMind, avalable from
<a href="http://www.maxmind.com">http://www.maxmind.com</a>.

