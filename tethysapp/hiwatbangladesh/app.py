from tethys_sdk.base import TethysAppBase, url_map_maker


class Hiwatbangladesh(TethysAppBase):
    """
    Tethys app class for Hiwatbangladesh.
    """

    name = 'HIWAT Streamflow Prediction Tool - Bangladesh'
    index = 'hiwatbangladesh:home'
    icon = 'hiwatbangladesh/images/icon.gif'
    package = 'hiwatbangladesh'
    root_url = 'hiwatbangladesh'
    color = '#16a085'
    description = ''
    tags = 'HIWAT'
    enable_feedback = False
    feedback_emails = []


    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)
        url_maps = (
            UrlMap(
                name='home',
                url='hiwatbangladesh',
                controller='hiwatbangladesh.controllers.index'),
            UrlMap(
                name='chartHiwat',
                url='hiwatbangladesh/chartHiwat',
                controller='hiwatbangladesh.controllers.chartHiwat'),
            UrlMap(
                name='getGeoJson1',
                url='hiwatbangladesh/getGeoJson1',
                controller='hiwatbangladesh.controllers.getGeoJson1'),
            UrlMap(
                name='getForecastCSV',
                url='hiwatbangladesh/getForecastCSV',
                controller='hiwatbangladesh.controllers.getForecastCSV'),
            UrlMap(
                name='getHistoricCSV',
                url='hiwatbangladesh/getHistoricCSV',
                controller='hiwatbangladesh.controllers.getHistoricCSV'),
        )
        return url_maps