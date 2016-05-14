<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<?php
$url        = 'control.xml';
$xml        = simplexml_load_file($url);
$fulltitle  = $xml->fulltitle;
$subtitle   = $xml->subtitle;
$link       = $xml->link;
?>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <meta name="language" content="en" />
  <meta name="author" content="Jade Faist" />

  <title><?php echo $fulltitle . ' - ' . $subtitle; ?></title>

  <link href="/favicon.ico" rel="icon" type="image/x-icon" />
  <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

  <link href="/styles/portfolio.css" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>

<?php
echo '<h1><a href="'.$link.'">'.$fulltitle.'</a></h1>
'.'<h2>'.$subtitle.'</h2>
';

foreach($xml->slide as $slide) {
  echo '<div class="slide">
  '.'<p>'.$slide->description.'</p>
  '.'<img src="'.$slide->image.'" alt="'.$slide->title.'" />
  '.'</div>
  ';
}

?>

</body>
