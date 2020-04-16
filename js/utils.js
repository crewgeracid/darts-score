function getNewObjectFromSample($sample) {
  var $object = $sample.clone();
  $object.attr("class", $object.attr("class").replace(HTML_SAMPLE_SUFFIX, ""));
  return $object;
}
