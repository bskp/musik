<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="html">
	<xsl:apply-templates />
</xsl:template>

<xsl:template match="body">
 <songsheet>
	<xsl:apply-templates />
 </songsheet>
</xsl:template>

<!-->
<xsl:template match="div#info">
 <info>
	<xsl:apply-templates />
 </info>
</xsl:template>
-->
<xsl:template match="h1">
	<title><xsl:apply-templates /></title>
</xsl:template>

<xsl:template match="h2">
	<composer><xsl:apply-templates /></composer>
</xsl:template>

<xsl:template match="span.chord">
	<chord />
	<xsl:attribute name="name"><xsl:apply-templates /></xsl:attribute>
</xsl:template>

<xsl:template match="br">
	<br />
</xsl:template>

</xsl:stylesheet>